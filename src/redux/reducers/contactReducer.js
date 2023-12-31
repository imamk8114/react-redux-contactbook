const initialState = [
    {
        id:0,
        name:"Imam",
        number:123,
        email:"abc@gmail.com"
    },
    {
        id:1,
        name:"Khan",
        number:121,
        email:"xyz@gmail.com"
    }
]

const  contactReducer = (state = initialState, action) => {
    switch(action.type){
        case "ADD_CONTACT":
            state = [...state, action.payload];
            initialState.push(action.payload)
            console.log(initialState);
            return state; 
        
        case "UPDATE_CONTACT":
            const updateState = state.map(contact => 
                contact.id === action.payload.id? action.payload: contact);
            state = updateState;
            return state;
        case "DELETE_CONTACT":
            const filterContacts = state.filter(contact => contact.id !== action.payload && contact)
            state = filterContacts;
            return state;
        default: 
            return state;
    }
}

export default contactReducer;