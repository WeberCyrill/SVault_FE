import '../App.css'
import {accessUser, PeasantResponse} from "../services/LoginService.ts";
import {AxiosResponse} from "axios";
import {Form, Formik, Field} from "formik";
import {Button, Input} from "@nextui-org/react";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import * as Yup from 'yup';
import {EyeSlashIcon} from "../assets/svg/EyeSlashIcon.tsx";
import {EyeIcon} from "../assets/svg/EyeIcon.tsx";


function Login() {

    const navigate = useNavigate();

    const [isValidCredentials, setIsValidCredentials] = useState(true);

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const loginValidationSchema = Yup.object().shape({
        username: Yup.string().required("Required"),
        password: Yup.string().required("Required")
    })


    return (
        <Formik
            validateOnChange={false}
            validateOnBlur={false}
            initialValues={{username: "", password: ""}}
            validationSchema={loginValidationSchema}
            onSubmit={(values, actions) => {
                accessUser(values.username, values.password).then((response: AxiosResponse<PeasantResponse>) => {
                    if (response.status === 200) {
                        localStorage.setItem("token", btoa(response.data.name + ":" + response.data.password));
                        navigate("/home");
                    }
                }).catch(() => {
                    setIsValidCredentials(false)
                }).finally(() => {
                    actions.setSubmitting(false)
                });
            }}
        >
            {({isSubmitting, errors, isValid}) => (
                <Form className=" flex flex-col items-center just3ify-center h-[80vh] gap-5">
                    <h1 className="text-3xl font-bold">Login</h1>
                    <Field name="username">
                        {({field}) => (
                            <Input
                                {...field}
                                isRequired
                                type="text"
                                label="Username"
                                name="username"
                                className="max-w-xs "
                                isInvalid={!isValid || !isValidCredentials}
                                errorMessage={errors.username}
                            />
                        )}
                    </Field>
                    <Field name="password">
                        {({field}) => (
                            <Input
                                {...field}
                                isRequired
                                label="Password"
                                name="password"
                                className="max-w-xs "
                                isInvalid={!isValid || !isValidCredentials}
                                errorMessage={errors.password}
                                endContent={
                                    <button type="button" onClick={toggleVisibility}
                                            aria-label="toggle password visibility">
                                        {isVisible ? (
                                            <EyeSlashIcon className="text-2xl text-default-400 pointer-events-none"/>
                                        ) : (
                                            <EyeIcon className="text-2xl text-default-400 pointer-events-none"/>
                                        )}
                                    </button>
                                }
                                type={isVisible ? "text" : "password"}
                            />
                        )}
                    </Field>
                    <Button disabled={isSubmitting} type="submit" color="primary">
                        Login
                    </Button>
                </Form>
            )}
        </Formik>
    )
}

export default Login