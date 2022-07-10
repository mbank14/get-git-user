// import logo from './logo.svg';
// import './App.css';

import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Container } from '@mui/system';
import { Stack, Item, TextField, Autocomplete, TablePagination } from '@mui/material';
// getAPI
import { getSearch, getSearchAll } from './stores/reducers/search';
import { getUserRepo } from './stores/reducers/repository';


function App() {
  // useDispatch
  const searchBar = useSelector(state => state.search.data.items)
  const dispatch = useDispatch();
  // Global
  // state
  const [valSearch, setValSearch] = useState([])
  const [page, setPage] = useState(2)
  const [rowsPerPage, setRowsPerPage] = useState(10)


  useEffect(() => {
      dispatch(getSearch('lamse'))

      if(searchBar){
        setValSearch(searchBar)
      }
    // dispatch(getUserRepo)
  }, [getSearch()])


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
    <div>
      <Container>
       <Stack>
         {/* search Component */}
         <div>
            <Stack>
              <h3>Cari user disini</h3>
              <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={valSearch.map((option) => option.login)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search input"
                    InputProps={{
                      ...params.InputProps,
                      type: 'search',
                    }}
                  />
                  )}
               />
            </Stack>
         </div>
         
         <div>
            <h3>Repository</h3>
            <div>
            
            <TablePagination
              component="div"
              count={50}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5,10,25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </div>
            {/* <div></div> */}
            {JSON.stringify(valSearch)}
       </div>
       </Stack>
      </Container>
    
    </div>
  );
}

export default App;
