import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {NewTrainingPokemon} from "./pages/NewTrainingPokemon";
import {Home} from "./pages/Home";

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
                        <Home />
                    } />
                    <Route path='/new-training-pokemon' element={
                        <NewTrainingPokemon pokedexID={294} />
                    } />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </div>
  );
}

export default App;
