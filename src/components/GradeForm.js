import React from 'react'
// form
import { useForm, FormProvider } from "react-hook-form";
// components
import { MenuItem, Grid, Button, Stack } from '@mui/material'
import RHFSelect from './RHFSelect'
// assets
import { CSCourses, ITCourses } from '../assets'

// --------------------------------------------------------------------------------------------

const MAJOR_OPTIONS = ['CS', 'IT']

const SEMESTER_OPTIONS = ['1/2022', '2/2022', '3/2022']

const GROUP_COURSE_CS_OPTIONS = CSCourses.curriculum.subjects.map(subject => subject)
const GROUP_COURSE_IT_OPTIONS = ITCourses.curriculum.subjects.map(subject => subject)

const GRADE_OPTIONS = [
    { label: 'A', value: '4' },
    { label: 'A-', value: '3.75' },
    { label: 'B+', value: '3.25' },
    { label: 'B', value: '3' },
    { label: 'B-', value: '2.75' },
    { label: 'C+', value: '2.25' },
    { label: 'C', value: '2' },
    { label: 'C-', value: '1.75' },
    { label: 'D', value: '1' },
    { label: 'F', value: '0' },
    { label: 'W', value: 'excluded' },
]

// --------------------------------------------------------------------------------------------

export default function GradeForm({ onAdd }) {

    const defaultValues = {
        major: 'CS',
        groupCourse: '',
        semester: '',
        subject: '',
        addedGrade: ''
    }

    const methods = useForm({ defaultValues });

    const {
        handleSubmit,
        setValue,
        resetField,
        watch,
    } = methods;

    const values = watch();

    const { major, groupCourse } = values;

    // CS or IT Courses
    const courseOptions = () => {
        if (major === 'CS') {
            return GROUP_COURSE_CS_OPTIONS
        } else if (major === 'IT') {
            return GROUP_COURSE_IT_OPTIONS
        }
    };

    // Reset if major is changed
    const handleChangeMajor = (event) => {
        resetField('groupCourse')
        resetField('subject')
        setValue('major', event.target.value)
    };

    // Reset if groupCourse is changed
    const handleChangeGroupCourse = (event) => {
        resetField('subject')
        setValue('groupCourse', event.target.value)
    };

    const onSubmit = (data) => {
        onAdd(data)
    }

    return (
        <FormProvider {...methods}>
            <Stack direction="row" sx={{ pb: 2 }} spacing={2}>
                <Grid item xs={12} md={6}>
                    <RHFSelect name="major" label="Major" onChange={handleChangeMajor}>
                        {MAJOR_OPTIONS.map((option) => (
                            <MenuItem
                                key={option}
                                value={option}
                            >
                                {option}
                            </MenuItem>
                        ))}
                    </RHFSelect>
                </Grid>
                <Grid item xs={12} md={6}>
                    <RHFSelect name="semester" label="Semester">
                        {SEMESTER_OPTIONS.map((option) => (
                            <MenuItem
                                key={option}
                                value={option}
                            >
                                {option}
                            </MenuItem>
                        ))}
                    </RHFSelect>
                </Grid>
            </Stack>

            <Stack direction="row" sx={{ pb: 2 }}>
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} md={6}>
                        <RHFSelect name="groupCourse" label="Group Course" disabled={!major} onChange={handleChangeGroupCourse}>
                            {courseOptions().map((option) => (
                                <MenuItem
                                    key={option.groupName}
                                    value={option.groupName}
                                >
                                    {option.groupName}
                                </MenuItem>
                            ))}
                        </RHFSelect>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <RHFSelect name="subject" label="Subject" disabled={!groupCourse}>
                            {!!groupCourse ? courseOptions().find((subject) => subject.groupName === groupCourse)
                                .subjects.map((option) => (
                                    <MenuItem
                                        key={option.code.concat(' ', option.name)}
                                        value={option.code.concat(' ', option.name)}
                                    >
                                        {option.code.concat(' ', option.name)}
                                    </MenuItem>
                                )) :
                                (
                                    <MenuItem
                                    >
                                        None
                                    </MenuItem>
                                )}
                        </RHFSelect>
                    </Grid>
                </Grid>

            </Stack>

            <Stack direction="row" sx={{ pb: 2 }}>
                <Grid item xs={12} md={12}>
                    <RHFSelect name="addedGrade" label="Grade">
                        {GRADE_OPTIONS.map((option) => (
                            <MenuItem
                                key={option.value}
                                value={option.label}
                            >
                                {option.label}
                            </MenuItem>
                        ))}
                    </RHFSelect>
                </Grid>
            </Stack>

            <Grid item xs={12} md={12}>
                <Button fullWidth variant="contained" size="large" type="submit" onClick={handleSubmit(onSubmit)}>Add</Button>
            </Grid>
        </FormProvider>
    )
}