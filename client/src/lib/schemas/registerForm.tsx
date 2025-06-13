import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../../features/account/accountApi";
import { RegisterSchema, registerSchema } from "./registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockOutlined } from "@mui/icons-material";
import { Box, Button, Container, Link, Paper, TextField, Typography } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';

export default function RegisterForm() {
    const [registerUser, { isLoading }] = useRegisterMutation();
    const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm<RegisterSchema>({
        mode: "onTouched",
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterSchema) => {
        try {
            await registerUser(data).unwrap();
        } catch (error) {
            const apiError = error as { message?: string };
            if (apiError.message && typeof apiError.message === 'string') {
                const errorArray = apiError.message.split(',');
                let handled = false;
                errorArray.forEach(e => {
                    if (e.includes('Password')) {
                        setError('Password', { message: e });
                        handled = true;
                    } else if (e.includes('Email')) {
                        setError('email', { message: e });
                        handled = true;
                    }
                });
                // Se não for erro de email ou senha, exibe erro genérico
                if (!handled) {
                    setError('root', { message: apiError.message });
                }
            } else {
                setError('root', { message: 'Erro inesperado ao registrar. Tente novamente.' });
            }
        }
    };

    return (
        <Container component={Paper} maxWidth='sm' sx={{ borderRadius: 3 }}>
            <Box display='flex' flexDirection='column' alignItems='center' marginTop={8}>
                <LockOutlined sx={{ mt: 3, color: 'secondary.main', fontSize: 40 }} />
                <Typography variant="h5">
                    Register
                </Typography>
                <Box
                    component='form'
                    onSubmit={handleSubmit(onSubmit)}
                    width='100%'
                    display='flex'
                    flexDirection='column'
                    gap={3}
                    marginY={3}
                >
                    <TextField
                        fullWidth
                        label='Email'
                        autoFocus
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        fullWidth
                        label='Password'
                        type='password'
                        {...register('Password')}
                        error={!!errors.Password}
                        helperText={errors.Password?.message}
                    />
                    <Button disabled={isLoading || !isValid} variant="contained" type="submit">
                        Register
                    </Button>
                    <Typography sx={{ textAlign: 'center' }}>
                        Already have an account?
                        <Link component={RouterLink} to='/login' color='primary' sx={{ ml: 3 }}>
                            Sign in here
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
}