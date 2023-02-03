import {
	FormControl,
	FormLabel,
	FormHelperText,
	Input,
	Flex,
	Select,
	Button,
	Heading,
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	useToast,
  } from "@chakra-ui/react";
  import { useEffect } from "react";
  
  import { useDispatch, useSelector } from "react-redux";
  import { filterData, getData } from "../Redux/actions";
  import  {EditTodoList}  from "./EditTodoList";
  import { useState } from "react";
  
  export default function TodoList() {
	const dispatch = useDispatch();
	const toast = useToast()
	let data = useSelector((store) => store.todos);
	useEffect(() => {
	  apiCall();
	}, []);

	const [user, setuser] = useState({
		name: "",
		date: "",
		age: "",
		last:"",
	  });

	  function handleChange(e) {
		//   console.log(e.target.value)
		setuser({ ...user, [e.target.id]: e.target.value });
	  }

	async function handleSubmit(e) {
		e.preventDefault();
		// console.log(user)
		try{
		  let res = await fetch('https://to-do-i7no.onrender.com/todo',{
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(user),
		  });
		  let data = await res.json();
		  console.log(data)
		} catch (e){
			// console.log(e)
			
		}

		toast({
			title: "Successfully Add Todo",
			description: "We've created your todo.",
			status: "success",
			duration: 9000,
			isClosable: true,
			position: "top",
		  });
		  window.location.reload();

	}

  
	async function apiCall() {
	  let res = await fetch("https://to-do-i7no.onrender.com/todo");
	  res = await res.json();
	  dispatch(getData(res));
	}

	// console.log(data)
  
	async function handleDelete(id) {
	   await fetch(`https://to-do-i7no.onrender.com/todo/${id}`, {
		method: "DELETE",
		headers: {
		  "Content-Type": "application/json",
		},
	  });
	  apiCall();
	}

	async function filtertodo(e) {
		let value = e.target.value;
		let res = await fetch(`https://to-do-i7no.onrender.com/todo?last=${value}`);
		res = await res.json().then((res) => dispatch(filterData(res)));
	  }

	return (
	  <Flex mt={60} w={"100vw"} alignItems={"center"} justifyContent="space-evenly">
	
		<Flex alignItems="center" justifyContent="center">
		  <FormControl boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"} p={"2rem"}>
			<Heading m={15}>ADD TO-DO</Heading>
			<FormLabel mt="10px">Name</FormLabel>
			<Input type="text" placeholder="Alan " id="name" onChange={handleChange} />

			<FormLabel mt="10px">LAST NAME</FormLabel>
			<Input type="text" placeholder="Walker" id="last" onChange={handleChange} />

			<FormLabel mt="10px">Date</FormLabel>
			<Input type="date" placeholder="dd/mm/yyyy" id="date" onChange={handleChange} />
  
			<FormLabel mt="10px">Age</FormLabel>
			<Input type="number" placeholder="Age" id="age" onChange={handleChange} />
  
			<Button mt="15px" width="full" type="submit" color='white' colorScheme="teal" onClick={handleSubmit}>
			  SUBMIT
			</Button>
			<FormHelperText>Fill The Proper Details.</FormHelperText>
		  </FormControl>
		</Flex>
  
		<Flex mt={-150} flexDirection={"column"}>
		  <Heading m={"2rem"}>TO-DO LIST</Heading>
		       <Select mb={2} placeholder="FILTER AGE" onChange={filtertodo}>
				<option value="khan">Khan</option>
				<option value="kumar">Kumar</option>
				<option value="sharma">Sharma</option>
				<option value="shukla">Shukla</option>
				<option value="singh">singh</option>
				<option value="yadav">Yadav</option>
				<option value="gill">Gill</option>
				<option value="kori">kori</option>
				</Select>

		  <TableContainer
			boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
			pt={"1rem"}
		  >
			<Table variant="striped">
			  <TableCaption></TableCaption>
			  <Thead>
				<Tr>
				  <Th>Id</Th>
				  <Th>NAME</Th>
				  <Th>LAST NAME</Th>
				  <Th>DATE</Th>
				  <Th>AGE</Th>
				  <Th>Edit</Th>
				  <Th>Delete</Th>
				</Tr>
			  </Thead>
			  <Tbody>
				{data.map((el, index) => {
				  return (
					<Tr key={index + 1}>
					  <Td>{el.id}</Td>
					  <Td>{el.name}</Td>
					  <Td>{el.last}</Td>
					  <Td>{el.date}</Td>
					  <Td>{el.age}</Td>
					  <Td>
						<EditTodoList el={el} apiCall={apiCall} toast={toast} />
					  </Td>
					  <Td>
						<Button
						  variant={"solid"}
						  colorScheme={"red"}
						  onClick={() => {
							handleDelete(el.id);
						  }}
						>
						  Delete
						</Button>
					  </Td>
					</Tr>
				  );
				})}
			  </Tbody>
			</Table>
		  </TableContainer>
		</Flex>
	  </Flex>
	);
  }
  