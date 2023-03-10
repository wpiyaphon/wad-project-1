import React from 'react'
// @mui
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// components
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack } from '@mui/material'

export default function GradeTable({ semester, rows, semesterGPA, onDelete }) {

    return (
        <TableContainer component={Paper} elevation={2}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ width: '20%' }}>Semester {semester}</TableCell>
                        <TableCell sx={{ width: '60%' }} />
                        <TableCell sx={{ width: '20%' }} align="right">Semester GPA: {semesterGPA === 'NaN' ? '0' : semesterGPA}</TableCell>
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
                            <TableCell component="th" scope="row">
                                <Stack direction="row" alignItems="center">
                                    <DeleteOutlineIcon onClick={() => onDelete(row)} />
                                    {row.subject.substr(0, 8)}
                                </Stack>
                            </TableCell>
                            <TableCell>{row.subject.substr(8)}</TableCell>
                            <TableCell align="right">{row.grade}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}