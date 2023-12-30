// import {useCallback, useState} from "react";
// import axios from 'axios';
//
import {useState} from "react";
import axios from "axios";

const useMyCustomizeAPI = (method) => {

    const mtd = method.toLowerCase();
    const [data, setData] = useState(''); // data to be fetched
    const [isLoading, setIsLoading] = useState(false); // is it fetching?
    const [isError, setIsError] = useState(false); // is there an error?
    const header = {'Content-Type': 'application/json',
        'Authorization': 'JWT fefege...'}
    const fetchData = async (endpoint ,params = {}) => {
        setIsError(false); // reset error state
        setIsLoading(true); // set loading state to true to show loading indicator, for example

        let url = `http://10.100.102.11:3000/${endpoint}`;
        try {
            let result;
            if (mtd === 'get')
                result = await axios.get(url);
            else if (mtd === 'post')
                result = await axios.post(url, params,{headers: header});
            else if (mtd === 'delete')
                result = await axios.delete(url);
            else throw new Error();

            setData(result.data); // set data state
        } catch (error) {
            setIsError(true); // an error occurred, set error state to true
            setData("")
        } finally {
            setIsLoading(false); // set loading state to false to hide loading indicator
        }
    };
    return [data, isLoading, isError, fetchData];
};
module.exports = {
    BASE_URL: 'http://10.100.102.11:3000',
    useMyCustomizeAPI
};
