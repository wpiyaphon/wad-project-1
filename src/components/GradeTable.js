import React from 'react'
// components
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

export default function GradeTable({ semester, rows }) {

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

    function calculateSemesterGPA() {
        let totalGrade = 0
        let totalCourse = 0

        rows.map((row) => {
            if (row.grade !== 'W') {
                totalGrade += grades[row.grade]
                totalCourse += 1
            }
            return 0
        })

        if (totalCourse === 0 && totalGrade === 0) {
            return 0
        }
        return (totalGrade / totalCourse).toFixed(2)
    }

    return (
        <TableContainer component={Paper} elevation={2}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ width: '20%' }}>Semester {semester}</TableCell>
                        <TableCell sx={{ width: '60%' }} />
                        <TableCell sx={{ width: '20%' }} align="right">Semester GPA: {!!rows.length ? calculateSemesterGPA() : '0'}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Code</TableCell>
                        <TableCell align="left">Course</TableCell>
                        <TableCell align="right">Grade</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.semester.concat(' ', row.subject)}

                        >
                            <TableCell component="th" scope="row">{row.subject.substr(0, 8)}</TableCell>
                            <TableCell>{row.subject.substr(8)}</TableCell>
                            <TableCell align="right">{row.grade}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}