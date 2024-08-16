import '../App.css'
import {accessUser, PeasantResponse} from "../services/LoginService.ts";
import {AxiosResponse} from "axios";
import {Form, Formik, Field, useFormik} from "formik";
import {Button, Input} from "@nextui-org/react";

function Login() {

    return (

            <Formik
                initialValues={{ username: "", password: "" }}
                onSubmit={(values) =>
                {
                    console.log(values);
                    accessUser(values.username, values.password).then((response: AxiosResponse<PeasantResponse>) => {
                        if (response.status === 200) {
                            localStorage.setItem("user", JSON.stringify(response.data));
                            localStorage.setItem("token", btoa(response.data.name + ":" + response.data.password));
                        }

                    })
                }}
            >
                {({ isSubmitting }) => (
                <Form className=" items-center">

                    <Field name="username">
                    {({ field }) => (
                        <Input
                            {...field}
                            isRequired
                            type="text"
                            label="username"
                            name="username"
                            className="max-w-xs"
                        />
                    )}
                    </Field>
                    <Field name="password">
                    {({ field }) => (
                        <Input
                            {...field}
                            isRequired
                            type="password"
                            label="password"
                            name="password"
                            className="max-w-xs"
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