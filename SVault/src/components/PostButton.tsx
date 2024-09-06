import '../App.css';
import {postNewSvost} from "../services/SvostService.ts";
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
import {PlusIcon} from "../assets/svg/PlusIcon.tsx";

const PostButton = () => {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {setSvosts, svosts, currentPage, setCurrentPage, setSort} = useContext(PostContext);

    const validateSvost = Yup.object().shape({
        svostContent: Yup.string().max(4000, 'Your Post ist to long! (max 4000)').required("Required"),
    })

    return (
        <>
            <div className="relative z-30">
                <Button
                    className="w-20 h-20 fixed md:bottom-10 bottom-20 right-8 rounded-3xl data-[hover=true]:opacity-100"
                    onClick={onOpen}>
                    <PlusIcon/>
                </Button>
            </div>
            <Modal
                backdrop="blur"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">New Post</ModalHeader>
                            <Formik
                                initialValues={{svostContent: ''}}
                                validationSchema={validateSvost}
                                onSubmit={(values) => {
                                    postNewSvost(values.svostContent).then((value) => {
                                        if (currentPage == 1){
                                        setSvosts([{...value.data, liked: false}, ...svosts])
                                        }
                                        setCurrentPage(1)
                                        setSort("creationdate_desc")
                                    });
                                    onClose();
                                }}
                            >
                                {({handleSubmit, isValid, errors}) => (
                                    <Form onSubmit={handleSubmit}>
                                        <ModalBody>
                                            <Field name="svostContent">
                                                {({field}) => (
                                                    <Textarea
                                                        {...field}
                                                        label=""
                                                        placeholder="Write something"
                                                        minRows={10}
                                                        isInvalid={!isValid}
                                                        errorMessage={errors.svostContent}
                                                        spellCheck
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
