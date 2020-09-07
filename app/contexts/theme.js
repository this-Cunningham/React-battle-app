import React from 'react'

const {Consumer, Provider} = React.createContext();

export const ThemeConsumer = Consumer;
export const ThemeProvider = Provider;


// the provider is going to allow us what information is going to be available in our application to any component that needs it

//consumer is what we use in order to consume the information that we put on provider
