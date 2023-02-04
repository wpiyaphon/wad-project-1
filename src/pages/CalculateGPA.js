import React from 'react'
// components
import { Grid, Stack, Snackbar, Alert, Typography } from '@mui/material'
import GradeForm from '../components/GradeForm';
import GradeTable from '../components/GradeTable';

export default function CalculateGPA() {

    function createData(semester, subject, grade) {
        return { semester, subject, grade }
    }

    const [firstSemesterRows, setFirstSemesterRows] = React.useState([]);
    const [secondSemesterRows, setSecondSemesterRows] = React.useState([]);
    const [thirdSemesterRows, setThirdSemesterRows] = React.useState([]);
    const [totalGrade, setTotalGrade] = React.useState(0);
    const [totalCourse, setTotalCourse] = React.useState(0);

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

    // Add new row
    function handleAdd(data) {
        const { semester, subject, addedGrade } = data;
        if (semester === '1/2019') {
            if (!firstSemesterRows.some((row) => row.subject === subject)) {
                setFirstSemesterRows([...firstSemesterRows, createData(semester, subject, addedGrade)]);
                if (addedGrade !== 'W') {
                    setTotalGrade(totalGrade + grades[addedGrade])
                    setTotalCourse(totalCourse + 1)
                }
            } else {
                setOpen(true);
            }
        } else if (semester === '2/2019') {
            if (!secondSemesterRows.some((row) => row.subject === subject)) {
                setSecondSemesterRows([...secondSemesterRows, createData(semester, subject, addedGrade)]);
                if (addedGrade !== 'W') {
                    setTotalGrade(totalGrade + grades[addedGrade])
                    setTotalCourse(totalCourse + 1)
                }
            } else {
                setOpen(true);
            }
        } else if (semester === '3/2019') {
            if (!thirdSemesterRows.some((row) => row.subject === subject)) {
                setThirdSemesterRows([...thirdSemesterRows, createData(semester, subject, addedGrade)]);
                if (addedGrade !== 'W') {
                    setTotalGrade(totalGrade + grades[addedGrade])
                    setTotalCourse(totalCourse + 1)
                }
            } else {
                setOpen(true);
            }
        }
    }

    // Snackbars
    const [open, setOpen] = React.useState(false);
    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    console.log(totalCourse)


    return (
        <>
            <Grid container direction="row" alignItems="flex-end" sx={{ p: 3, pb: 0 }} spacing={2}>
                <Grid item xs={12} md={5}>
                    <Typography variant="h4">GPA Calculator</Typography>
                </Grid>
                <Grid item xs={12} md={7}>
                    <Stack direction="row">
                        <Typography variant="h5">Total GPA: {(totalGrade / totalCourse).toFixed(2)}</Typography>
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
                </Grid>
                <Grid item xs={12} md={7}>
                    <Stack direction="column" spacing={2}>
                        <GradeTable semester='1/2019' rows={firstSemesterRows}></GradeTable>
                        <GradeTable semester='2/2019' rows={secondSemesterRows}></GradeTable>
                        <GradeTable semester='3/2019' rows={thirdSemesterRows}></GradeTable>
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}