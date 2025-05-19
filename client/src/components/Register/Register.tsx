import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ImUserPlus } from "react-icons/im";
import { register } from "../../services/RegisterService";
import type { CreateUserDTO } from "../../dtos/CreateUserDTO";
import "./Register.css";

type ErrorState = Partial<Record<keyof CreateUserDTO, string>>;

const Register = () => {
    const [form, setForm] = useState<CreateUserDTO>({
        nombre: "",
        apellido: "",
        alias: "",
        fechaNacimiento: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState<ErrorState>({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const validateForm = (): boolean => {
        const newErrors: ErrorState = {};
        const emailRegex = /\S+@\S+\.\S+/;

        if (!form.nombre) newErrors.nombre = "Nombre obligatorio";
        if (!form.apellido) newErrors.apellido = "Apellido obligatorio";
        if (!form.alias) newErrors.alias = "Alias obligatorio";
        if (!form.fechaNacimiento) newErrors.fechaNacimiento = "Fecha obligatoria";
        if (!form.email) newErrors.email = "Correo obligatorio";
        else if (!emailRegex.test(form.email)) newErrors.email = "Correo inválido";
        if (!form.password || form.password.length < 6)
            newErrors.password = "Mínimo 6 caracteres";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            await register(form);
            await Swal.fire({
                icon: "success",
                title: "Cuenta creada",
                text: "Tu cuenta fue registrada correctamente.",
                confirmButtonText: "Ir a login",
                confirmButtonColor: "#4F9761",
            });
            navigate("/login");
        } catch {
            Swal.fire({
                icon: "error",
                title: "Error",
                text:  "No se pudo registrar",
                confirmButtonColor: "#4F9761",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-header">
                    <div className="logo-container">
                        <ImUserPlus className="login-icon" />
                    </div>
                    <h1>Regístrate</h1>
                    <p className="subtitle">Crea tu cuenta para unirte a la red</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form" noValidate>
                    {[
                        { label: "Nombre", name: "nombre" },
                        { label: "Apellido", name: "apellido" },
                        { label: "Alias", name: "alias" },
                        { label: "Fecha de nacimiento", name: "fechaNacimiento", type: "date" },
                        { label: "Correo electrónico", name: "email", type: "email" },
                    ].map(({ label, name, type = "text" }) => (
                        <div className="form-group" key={name}>
                            <label htmlFor={name}>{label}</label>
                            <input
                                id={name}
                                name={name}
                                type={type}
                                value={form[name as keyof CreateUserDTO]}
                                onChange={handleChange}
                                className={`input-field ${errors[name as keyof CreateUserDTO] ? "input-error" : ""}`}
                                autoComplete="off"
                            />
                            {errors[name as keyof CreateUserDTO] && (
                                <div className="error-message">{errors[name as keyof CreateUserDTO]}</div>
                            )}
                        </div>
                    ))}

                    {/* Contraseña */}
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <div className="password-input-container">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={form.password}
                                onChange={handleChange}
                                className={`input-field ${errors.password ? "input-error" : ""}`}
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
                        {errors.password && (
                            <div className="error-message">{errors.password}</div>
                        )}
                    </div>

                    <button type="submit" className="login-btn" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <span className="spinner"></span>
                                <span>Registrando...</span>
                            </>
                        ) : (
                            "Registrarme"
                        )}
                    </button>

                    <div className="register-link">
                        ¿Ya tienes una cuenta? <a href="/login">Inicia sesión aquí</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
