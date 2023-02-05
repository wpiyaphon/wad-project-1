import React from 'react'
import { useLocalStorage } from 'react-use';
// components
import { Grid, Stack, Snackbar, Alert, Typography } from '@mui/material'
import GradeForm from '../../components/GradeForm';
import GradeTable from '../../components/GradeTable';
import LineChart from '../../components/LineChart';

export default function CalculateGPAPage() {

    let [firstSemesterRows, setFirstSemesterRows] = useLocalStorage('firstSemesterRows', [])
    let [secondSemesterRows, setSecondSemesterRows] = useLocalStorage('secondSemesterRows', [{ semester: '1/2022', subject: 'CSX 4107 Web Application Development', grade: 'A' }])
    let [thirdSemesterRows, setThirdSemesterRows] = useLocalStorage('thirdSemesterRows', [])

    const [firstSemGPA, setFirstSemGPA] = React.useState(0);
    const [firstSemCourse, setFirstSemCourse] = React.useState(0);
    const [secondSemGPA, setSecondSemGPA] = React.useState(0);
    const [secondSemCourse, setSecondSemCourse] = React.useState(0);
    const [thirdSemGPA, setThirdSemGPA] = React.useState(0);
    const [thirdSemCourse, setThirdSemCourse] = React.useState(0);
    const [totalGPA, setTotalGPA] = React.useState(0);

    const grades = {
        'A': 4,
        'A-': 3.75,
        'B+': 3.25,
        'B': 3,
        'B-': 2.75,
        'C+': 2.25,
        'C': 2,
        'C-': 1.75,
        'D': 1,
        'F': 0,
        'W': 0,
    }

    // Handle adding new course
    function createData(semester, subject, grade) {
        return { semester, subject, grade }
    }

    function handleAdd(data) {

        const { semester, subject, addedGrade } = data;
        if (semester === '1/2022') {
            if (!firstSemesterRows.some((row) => row.subject === subject)) {
                setFirstSemesterRows([...firstSemesterRows, createData(semester, subject, addedGrade)]);
            } else {
                setOpen(true);
            }
        } else if (semester === '2/2022') {
            if (!secondSemesterRows.some((row) => row.subject === subject)) {
                setSecondSemesterRows([...secondSemesterRows, createData(semester, subject, addedGrade)]);
            } else {
                setOpen(true);
            }
        } else if (semester === '3/2022') {
            if (!thirdSemesterRows.some((row) => row.subject === subject)) {
                setThirdSemesterRows([...thirdSemesterRows, createData(semester, subject, addedGrade)]);
            } else {
                setOpen(true);
            }
        }

    }

    // Snackbars warning
    const [open, setOpen] = React.useState(false);
    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    React.useEffect(() => {
        setFirstSemGPA(0)
        setFirstSemCourse(0)
        setSecondSemGPA(0)
        setSecondSemCourse(0)
        setThirdSemGPA(0)
        setThirdSemCourse(0)

        firstSemesterRows.map(row => {
            if (row.grade !== 'W') {
                setFirstSemGPA(firstSemGPA => firstSemGPA + grades[row.grade])
                setFirstSemCourse(firstSemCourse => firstSemCourse + 1);
            }
            return 0
        });

        secondSemesterRows.map(row => {
            if (row.grade !== 'W') {
                setSecondSemGPA(secondSemGPA => secondSemGPA + grades[row.grade])
                setSecondSemCourse(secondSemCourse => secondSemCourse + 1);
            }
            return 0
        });

        thirdSemesterRows.map(row => {
            if (row.grade !== 'W') {
                setThirdSemGPA(thirdSemGPA => thirdSemGPA + grades[row.grade])
                setThirdSemCourse(thirdSemCourse => thirdSemCourse + 1);
            }
            return 0
        });

    }, [firstSemesterRows, secondSemesterRows, thirdSemesterRows]);


    React.useEffect(() => {
        let tempSem = 0
        let tempGPA = 0

        if (firstSemCourse > 0) {
            tempGPA += firstSemGPA / firstSemCourse
            tempSem += 1
        }

        if (secondSemCourse > 0) {
            tempGPA += secondSemGPA / secondSemCourse
            tempSem += 1
        }

        if (thirdSemCourse > 0) {
            tempGPA += thirdSemGPA / thirdSemCourse
            tempSem += 1
        }

        if (tempSem > 0) {
            setTotalGPA(tempGPA / tempSem)
        } else {
            setTotalGPA(0)
        }

    }, [firstSemGPA, firstSemCourse, secondSemGPA, secondSemCourse, thirdSemGPA, thirdSemCourse])

    return (
        <>
            <Grid container direction="row" alignItems="flex-end" sx={{ p: 3, pb: 0 }} spacing={2}>
                <Grid item xs={12} md={5}>
                    <Typography variant="h4">GPA Calculator</Typography>
                </Grid>
                <Grid item xs={12} md={7}>
                    <Stack direction="row">
                        <Typography variant="h5">Total GPA: {totalGPA.toFixed(2)}</Typography>
                    </Stack>
                </Grid>
            </Grid>

            <Grid container direction="row" sx={{ p: 3 }} spacing={2}>
                <Grid item xs={12} md={5}>
                    <GradeForm onAdd={handleAdd} />
                    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                            The course already exists!
                        </Alert>
                    </Snackbar>
                    <Grid item xs={12} md={12} sx={{mt: 2}}>
                        <LineChart firstSemGPA={(firstSemGPA / firstSemCourse)} secondSemGPA={(secondSemGPA / secondSemCourse)} thirdSemGPA={(thirdSemGPA / thirdSemCourse)} />
                    </Grid>
                </Grid>
                <Grid item xs={12} md={7}>
                    <Stack direction="column" spacing={2}>
                        <GradeTable semester='1/2022' rows={firstSemesterRows} semesterGPA={(firstSemGPA / firstSemCourse).toFixed(2)}></GradeTable>
                        <GradeTable semester='2/2022' rows={secondSemesterRows} semesterGPA={(secondSemGPA / secondSemCourse).toFixed(2)}></GradeTable>
                        <GradeTable semester='3/2022' rows={thirdSemesterRows} semesterGPA={(thirdSemGPA / thirdSemCourse).toFixed(2)}></GradeTable>
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}