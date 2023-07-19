import { useState } from 'react';

import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';

interface ChoiceProps {
    id: number;
    label: string;
    isMulti?: boolean;
    options: {
        id: number;
        label: string;
    }[];
}

function MultiChoice(props: ChoiceProps) {
    const {id, label, options} = props;

    const [value, setValue] = useState(new Set());

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentId = event.target.value;

        setValue(v => {
            const newValue = new Set(v);

            if (newValue.has(currentId)) {
                newValue.delete(currentId)
            } else {
                newValue.add(currentId);
            }

            return newValue;
        })
      };

    return (
        <Box sx={{
            mt: 2
        }}>
            <FormControl>
                <FormLabel component="legend">
                    {label}
                </FormLabel>
                <FormGroup>
                    {options.map(({id, label}) => (
                        <FormControlLabel
                            key={id}
                            control={
                                <Checkbox
                                    checked={value.has(id.toString())}
                                    onChange={handleChange}
                                    value={id}
                                    />
                            }
                            label={label}
                        />
                    ))}
                </FormGroup>
            </FormControl>
        </Box>
    )
}

export default function Choice(props: ChoiceProps) {
    const [value, setValue] = useState<number | null>(null);

    const {id, label, options, isMulti = false} = props;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number((event.target as HTMLInputElement).value));
    };

    if (isMulti) {
        return <MultiChoice {...props} />
    }

    return (
        <Box sx={{
            mt: 2
        }}>
            <FormControl>
                <FormLabel component="legend">
                    {label}
                </FormLabel>
                <RadioGroup value={value} onChange={handleChange}>
                    {options.map(({id, label}) => (
                        <FormControlLabel
                            key={id}
                            value={id}
                            control={<Radio />}
                            label={label}
                            />
                    ))}
                </RadioGroup>
            </FormControl>
        </Box>
    )
}