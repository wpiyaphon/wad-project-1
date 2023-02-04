import React from 'react'
import { useForm, Controller } from "react-hook-form";
import { TextField, MenuItem } from '@mui/material'
// assets
import { CSCourses, ITCourses } from '../assets'

export default function MajorSelect({ major }) {
    const { control } = useForm();

    const groupSubjects = () => {
        if (major === 'CS') {
            console.log("CS")
            return "CSCourses"
        } else {
            console.log("IT")
            return "ITCourses"
        }
    }



    return (
        <TextField defaultValue="" label={groupSubjects} />
    )
}