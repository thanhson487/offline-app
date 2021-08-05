import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Button, Label, Input } from "reactstrap";
import * as Realm from "realm-web";
// local import
import { addTodoOffline } from "../redux/actions/app";
var assert = require("assert");
/**
 * Home Component of offline-first Boilerplate.
 * @name Home
 */

function Home() {
  const app = Realm.App.getApp("mongodb-atlas-urepc"); 
  useEffect(() => {
    const getdata = async function () {
      const mongodb = app.currentUser.mongoClient("mongodb-atlas");
      const plants = mongodb.db("myTest").collection("Dog");
      // const result =  await plants.insertOne({

      //     name: "lily of the valley",
      //    id: "2",
      //   });
      //   console.log("a",result);
      const customData = await plants.find();
      console.log(customData);
    };

    getdata();
  }, [app]);

  // redux hook methods
  useSelector((state) => {
    return {
      todoItem: state.app.todoItem,
      status: state.app.status,
    };
  }, shallowEqual);

  const dispatch = useDispatch();
  // redux hook methods

  const [todo, setTodo] = useState("");

  const setTodoFunc = (e) => {
    dispatch(addTodoOffline(todo));
  };

  return (
    <>
      <h1>Home Screen</h1>
      <Label for="text">Add an Item</Label>
      <Input
        type="text"
        name="text"
        id="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Enter item name"
      />
      <Button onClick={setTodoFunc}>Add</Button>
    </>
  );
}

export default Home;
