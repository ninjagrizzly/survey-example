import { useState } from 'react';

import Box from '@mui/material/Box';
import MRating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

interface RatingProps {
    id: number;
    label: string;
    maxValue?: number;
}

export default function Rating(props: RatingProps) {
    const [value, setValue] = useState<number | null>(null);

    const {id, label, maxValue} = props;

    return (
        <Box
            sx={{
                mt: 2,
            }}
            >
            <Typography component="legend">{label}</Typography>
            <MRating
                size='large'
                value={value}
                max={maxValue}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            />
        </Box>
    )
}