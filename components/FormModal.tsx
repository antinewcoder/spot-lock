"use client";

import { Modal, TextInput, Group, Button, Stack } from "@mantine/core";
import { useState, useEffect } from "react";

import { InputValues } from "../app/types/password";



const EMPTY_FORM: InputValues = {
    place_name: "",
    place_address: "",
    wifi_name: "",
    password: "",
};

export default function FormModal({
  initialValues,
  onSave,
  onCancel,
  onDelete, 
}: {
  initialValues?: InputValues;
  onSave: (values: InputValues) => void;
  onCancel: () => void;
  onDelete: () => void; 
}) {
    const baselineValues = initialValues ? initialValues : EMPTY_FORM;
    const [values, setValues] = useState<InputValues>(baselineValues);

    useEffect(() => {
        setValues(initialValues ?? EMPTY_FORM);
    }, [initialValues]);

    const isInEditMode = !!initialValues;
    const disabled = (baselineValues.place_name === values.place_name) 
    &&  (baselineValues.place_address === values.place_address) 
    &&  (baselineValues.wifi_name === values.wifi_name) 
    && (baselineValues.password === values.password);
  
    return (
    <Modal opened={true} onClose={onCancel} title={initialValues ? "Edit password" : "Add password"}>
      <Stack>
        <TextInput 
            required 
            label="Place Name"
            value={values.place_name} 
            onChange={(e) => setValues({
                ...values, place_name: e.currentTarget.value
            })} />
        <TextInput
            required
            label="Address"
            placeholder="Street Name, City, Country"
            value={values.place_address}
            onChange={(e) =>
                setValues({ ...values, place_address: e.currentTarget.value })
             }
        />
        <TextInput 
            required
            label="WiFi Name" 
            value={values.wifi_name} 
            onChange={(e) =>
            {setValues({...values, wifi_name: e.currentTarget.value})}} />
        <TextInput 
            required
            label="Password"
            placeholder="WiFi Password"
            type="password" 
            value={values.password}
            onChange={(e) => 
                setValues({...values, password: e.currentTarget.value})
            } />
      </Stack>

      <Group justify="space-between" m="md">
            {isInEditMode && <Button color="red" onClick={onDelete}>
                Delete
            </Button>}
            <Group m="sm">
                <Button variant="default" onClick={onCancel}>
                    Cancel
                </Button>
                <Button disabled={disabled} color="green" onClick={() => onSave(values)}>
                    Save
                </Button>
            </Group>
        </Group>
    </Modal>
  );
}