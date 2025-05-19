import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import type { LoginDTO } from "../../dtos/LoginDTO.ts";
import "./Login.css";
import { login } from "../../services/LoginService.ts";
import { useAuth } from "../context/AuthContext";
import {ImUsers} from "react-icons/im";


type ErrorState = {
    email: string | null;
    password: string | null;
};

const Login = () => {
    const [form, setForm] = useState<LoginDTO>({ email: "", password: "" });
    const [errors, setErrors] = useState<ErrorState>({ email: null, password: null });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const navigate = useNavigate();
    const { login: authLogin } = useAuth();

    useEffect(() => {
        if (form.email) setErrors(prev => ({ ...prev, email: null }));
    }, [form.email]);

    useEffect(() => {
        if (form.password) setErrors(prev => ({ ...prev, password: null }));
    }, [form.password]);

    const validateForm = (): boolean => {
        const newErrors: ErrorState = { email: null, password: null };
        let isValid = true;

        if (!form.email) {
            newErrors.email = "El correo electrónico es obligatorio";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = "Formato de correo inválido";
            isValid = false;
        }

        if (!form.password) {
            newErrors.password = "La contraseña es obligatoria";
            isValid = false;
        } else if (form.password.length < 6) {
            newErrors.password = "La contraseña debe tener al menos 6 caracteres";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const { token, user } = await login(form.email, form.password);

            authLogin(token, user);

            await Swal.fire({
                icon: "success",
                title: "¡Bienvenido!",
                text: `${user.nombre}, has iniciado sesión correctamente.`,
                confirmButtonText: "Continuar",
                confirmButtonColor: "#4F9761"
            });

            navigate("/home");
        } catch (error) {
            console.error("Error de login:", error);
            Swal.fire({
                icon: "error",
                title: "Error de autenticación",
                text: "Correo o contraseña incorrectos. Intenta nuevamente.",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#4F9761"
            });
            setIsLoading(false);
        }
    };
    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-header">
                    <div className="logo-container">
                        <ImUsers className="login-icon"/>
                    </div>
                    <h1>Inicia Sesión</h1>
                    <p className="subtitle">Bienvenido a tu red social</p>
                </div>

                <form onSubmit={handleLogin} className="login-form" noValidate>
                    <div className="form-group">
                        <label htmlFor="email">
                            <i className="bi bi-envelope"></i> Correo electrónico
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Ingresa tu correo"
                            className={`input-field ${errors.email ? "input-error" : ""}`}
                            aria-invalid={errors.email ? "true" : "false"}
                            aria-describedby={errors.email ? "email-error" : undefined}
                            disabled={isLoading}
                            autoComplete="email"
                        />
                        {errors.email && <div id="email-error" className="error-message">{errors.email}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">
                            <i className="bi bi-lock"></i> Contraseña
                        </label>
                        <div className="password-input-container">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Ingresa tu contraseña"
                                className={`input-field ${errors.password ? "input-error" : ""}`}
                                aria-invalid={errors.password ? "true" : "false"}
                                aria-describedby={errors.password ? "password-error" : undefined}
                                disabled={isLoading}
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={togglePasswordVisibility}
                                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                            >
                                <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                            </button>
                        </div>
                        {errors.password && <div id="password-error" className="error-message">{errors.password}</div>}
                    </div>

                    <div className="form-options">
                        <div className="remember-me">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">Recordarme</label>
                        </div>
                        <a href="/recuperar-password" className="forgot-password">¿Olvidaste tu contraseña?</a>
                    </div>

                    <button type="submit" className="login-btn" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <span className="spinner"></span>
                                <span>Iniciando sesión...</span>
                            </>
                        ) : (
                            "Iniciar Sesión"
                        )}
                    </button>

                    <div className="register-link">
                        ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;