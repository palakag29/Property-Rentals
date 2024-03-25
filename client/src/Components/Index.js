import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import Header from './Header';
import Properties from './Properties';

export default function IndexPage() {
    

    return (
        <div>
            <Header/>
            <div>
               <Properties/>
            </div>
        </div>
    );
}
