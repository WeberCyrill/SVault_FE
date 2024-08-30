import '../App.css';
import {postNewPost} from "../services/SvostService.ts";
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader, Textarea,
    useDisclosure
} from "@nextui-org/react";
import {Formik, Field, Form} from "formik";
import * as Yup from 'yup';
import {useContext} from "react";
import {PostContext} from "../Context/PostContext.tsx";

const PostButton = () => {

    const {addSvost} = useContext(PostContext);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const validateSvost = Yup.object().shape({
        postContent: Yup.string().max(4000, 'Your Post ist to long! (max 4000)').required("Required"),
    })

    return (
        <>
            <div className="relative z-10">
                <Button className="w-20 h-20 fixed bottom-10 right-10 rounded-3xl"
                        onClick={onOpen}>
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 448 512">
                        <path
                            d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/>
                    </svg>
                </Button>
            </div>

            <Modal
                backdrop="blur"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">New Post</ModalHeader>
                            <Formik
                                initialValues={{postContent: ''}}
                                validationSchema={validateSvost}
                                onSubmit={(values) => {
                                    postNewPost(values.postContent).then((value) => {
                                        addSvost(value.data)
                                    });
                                    onClose();
                                }}
                            >
                                {({handleSubmit, isValid, errors}) => (
                                    <Form onSubmit={handleSubmit}>
                                        <ModalBody>
                                            <Field name="postContent">
                                                {({field}) => (
                                                    <Textarea
                                                        {...field}
                                                        label=""
                                                        placeholder="Write something"
                                                        minRows={10}
                                                        isInvalid={!isValid}
                                                        errorMessage={errors.postContent}
                                                    />
                                                )}
                                            </Field>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" variant="flat" onPress={onClose}>
                                                Cancel
                                            </Button>
                                            <Button color="primary" type="submit" isDisabled={!isValid}>
                                                Post
                                            </Button>
                                        </ModalFooter>
                                    </Form>
                                )}
                            </Formik>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default PostButton;
