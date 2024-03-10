import React from 'react';
import './App.css';
import Home from "./pages/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
});

function App() {
  return (
    <div className="App">
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path='/home' element={
                        <Home pokedexID={ 1000 } />
                    }>
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </div>
  );
}

export default App;
