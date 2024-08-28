import '../App.css'
import {accessUser, PeasantResponse} from "../services/LoginService.ts";
import {AxiosResponse} from "axios";
import {Form, Formik, Field} from "formik";
import {Button, Input} from "@nextui-org/react";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import * as Yup from 'yup';



function Login() {

    const navigate = useNavigate();
    const [isInvalid, setIsInvalid] = useState(false);

    const loginValidationSchema = Yup.object().shape({
        username: Yup.string().required("Required"),
        password: Yup.string().required("Required")
    })

    return (

            <Formik
                initialValues={{ username: "", password: "" }}
                validationSchema={loginValidationSchema}
                onSubmit={(values, actions) =>
                {
                    accessUser(values.username, values.password).then((response: AxiosResponse<PeasantResponse>) => {
                        if (response.status === 200) {
                            localStorage.setItem("user", JSON.stringify(response.data));
                            localStorage.setItem("token", btoa(response.data.name + ":" + response.data.password));
                            navigate("/svosts");
                        }
                    }).catch(() => {setIsInvalid(true)}).finally(() => {actions.setSubmitting(false)});
                }}
            >
                {({ isSubmitting, errors, isValid }) => (
                <Form className=" flex flex-col items-center just3ify-center h-[80vh] gap-5">

                    <Field name="username">
                    {({ field }) => (
                        <Input
                            {...field}
                            isRequired
                            type="text"
                            label="Username"
                            name="username"
                            className="max-w-xs "
                            isInvalid={isInvalid}
                            errorMessage={errors.username}
                        />
                    )}
                    </Field>
                    <Field name="password">
                    {({ field }) => (
                        <Input
                            {...field}
                            isRequired
                            type="password"
                            label="Password"
                            name="password"
                            className="max-w-xs"
                            isInvalid={isInvalid || !isValid}
                            errorMessage={errors.password}
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