import { Box, FormControl, FormControlLabel, FormGroup, Paper, Radio, TextField } from "@mui/material";
import { useFetchFiltersQuery } from "./CatalogApi"
import { CheckBox } from "@mui/icons-material";

const sortOptions = [
    { value: 'name', label: 'Alphbetical' },
    { value: 'princeDesc', label: 'Price: High to Low' },
    { value: 'price', label: 'Price: Low to high' },
]

export default function Filters() 
{
    const { data } = useFetchFiltersQuery();
    console.log(data);

    return (
        <Box display='flex' flexDirection='column' gap={3}>
            <Paper>
                <TextField
                    label='Tu dá uma Zoiada aqui'
                    variant="outlined"
                    fullWidth
                />
            </Paper>
            <Paper sx={{ p: 3 }}>
                <FormControl>
                    {sortOptions.map(({ value, label }) => (
                        <FormControlLabel
                            key={label}
                            control={<Radio sx={{ py: 0.7 }} />}
                            label={label}
                            value={value}
                        />
                    ))}
                </FormControl>
            </Paper>
            <Paper sx={{p:3}}>
                <FormGroup>
                    {data && data.types.map(item=>(<FormControlLabel
                        key={item}
                        control={<CheckBox color='secondary' sx={{ py: 0.7, fontSize: 40 }} />}
                        label={item}                    
                        />
                        ))}
                </FormGroup>
            </Paper>
        </Box>
    )
}