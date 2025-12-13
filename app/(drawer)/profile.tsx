import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, TextInput, View } from "react-native";

const Profile = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitData = (data) => {
    console.log(data);
  };
  const editData = (data) => {
    console.log(data);
  }

  return (
    <View>
      <Controller control={control} name="username" render={({ field: {onChange, value}}) => (
        <TextInput onChangeText={onChange} value={value}/>
      ) } />
      <Button title="Edit" onPress={handleSubmit(submitData)}/>
      <Button title="Submit" onPress={handleSubmit(editData)}/>
    </View>
  );
};

export default Profile;
