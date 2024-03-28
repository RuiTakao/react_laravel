import axios from 'axios';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Home } from '../pages/Home';
import { BrowserRouter } from 'react-router-dom';
import { Router } from '../router/Router';
import { ChakraProvider } from '@chakra-ui/react';

if (document.getElementById('example')) {
    const Index = ReactDOM.createRoot(document.getElementById("example"));

    Index.render(
        <React.StrictMode>
            <ChakraProvider>
                <BrowserRouter>
                    <Router />
                </BrowserRouter>
            </ChakraProvider>
        </React.StrictMode>
    )
}
