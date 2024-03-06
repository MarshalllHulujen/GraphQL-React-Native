import {
  GetTodoListDocument,
  Todo,
  useGetTodoListQuery,
} from "@/graphql/generated";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

const CREATE_TODO = gql`
  mutation Mutation($input: TodoCreateInput!) {
    createTodo(input: $input) {
      id
      title
      completed
    }
  }
`;

export default function Index() {
  const [
    createTodo,
    { data: createdData, loading: createLoading, error: createError },
  ] = useMutation(CREATE_TODO);
  const { data, error, loading } = useGetTodoListQuery();
  const [title, setTitle] = useState("");

  function handleSubmit() {
    createTodo({
      variables: {
        input: {
          title,
          completed: false,
        },
      },
      refetchQueries: [{ query: GetTodoListDocument }],
    });
  }

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 30 }}>
          Loading...
        </Text>
      </View>
    );

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 30 }}>
          Error: {error.message}
        </Text>
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      {data?.getTodoList?.map((todo) => (
        <View style={{ gap: 20, flexDirection: "row" }}>
          <Text
            key={todo.id}
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: 20,
              gap: 15,
            }}
          >
            {todo.title}
          </Text>
          <View>
            <Button title="remove" />
          </View>
        </View>
      ))}
      <View style={{ flexDirection: "row" }}>
        <TextInput
          placeholder="type todo here"
          onChangeText={setTitle}
          value={title}
          style={{
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            width: 200,
          }}
        />
        <View style={{ width: 70 }}>
          <Button title="Add" onPress={() => handleSubmit()} />
        </View>
      </View>
    </View>
  );
}
