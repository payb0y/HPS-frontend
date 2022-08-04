import React from "react";
import "antd/dist/antd.min.css";
import { Button, Form, Input, Card, notification } from "antd";
import { addEnvironment, addGroup } from "../../api/UserAPI";
const AddItem = (props) => {
    const [form] = Form.useForm();
    const responseCheck = (res) => {
        if (res.status === 200) {
            form.resetFields();
            props.reloadData();
            notification.success({
                message: "Operation done successfully",
                placement: "top",
                duration: 1.5,
            });
        } else {
            notification.error({
                message: res,
                placement: "top",
                duration: 1.5,
            });
        }
    };
    const onFinish = async (values) => {
        if (values.name.indexOf(" ") >= 0) {
            notification.error({
                message: "SPACE NOT ALLOWED",
                placement: "top",
                duration: 1.5,
            });
        } else {
            let res;
            switch (props.type) {
                case "Group":
                    res = await addGroup(values.name);
                    responseCheck(res);
                    break;
                case "Environment":
                    res = await addEnvironment(values.name);
                    responseCheck(res);
                    break;
                default:
                    break;
            }
        }
    };
    return (
        <Card
            style={{
                width: 500,
                height: 130,
            }}
        >
            <Form
                form={form}
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label={`${props.type} name`}
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: `Please input the ${props.type} name`,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Add {props.type}
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};
export default AddItem;
