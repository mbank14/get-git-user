// import logo from './logo.svg';
// import './App.css';

import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Container, style } from '@mui/system';
import { Stack, Item, TextField, Autocomplete, TablePagination, Paper } from '@mui/material';
// getAPI
import { getSearch, getSearchAll } from './stores/reducers/search';
import { getUserRepo } from './stores/reducers/repository';


function App() {
  // useDispatch
  const searchBar = useSelector(state => state.search.data.items)
  const listRepo = useSelector((state) => state.repo.data)
  const dispatch = useDispatch();
  // Global
  // state
  const [valSearch, setValSearch] = useState([])
  const [inputSearch, setInputSearch] = useState('')
  const [page, setPage] = useState(2)
  const [rowsPerPage, setRowsPerPage] = useState(10)


  useEffect(() => {
      dispatch(getSearch(inputSearch))
      if(searchBar){
        setValSearch(searchBar)
      }
    }, [dispatch,inputSearch])
    
    
  useEffect(() => {
    dispatch(getUserRepo(inputSearch))
    localStorage.setItem('perPages', JSON.stringify(rowsPerPage));
  }, [inputSearch, rowsPerPage, getUserRepo()])

  const handleChangeSearch = (event) => {
    setInputSearch(event.target.value);
  }

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
                value={inputSearch}
                onChange={handleChangeSearch}
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
            <div style={{width: "100%"}}>
            
            <div style={{
              display:"flex",
              flexWrap: "wrap"
              }}>
                {listRepo.map((list) => {
                  return (
                    <div  style={{background: "#131313", padding:"6px 8px", width: "300px", color: "white",margin: "5px"}}>
                      <p key={list.id}>{list.id}</p>
                      <h4>{list.name}</h4>
                      <p>{list.language}</p>
                    </div>
                  )
                })}
            </div>
            
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
            
       </div>
       </Stack>
      </Container>
    
    </div>
  );
}

export default App;
