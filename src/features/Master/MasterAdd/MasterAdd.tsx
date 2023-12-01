import React from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

function MasterAdd() {
  return (
    <>
      <Grid container alignItems="center">
        <Grid item sm={12}>
          <h2>Add Master Component</h2>
        </Grid>
      </Grid>
      <Grid>
        <h3>Component</h3>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField fullWidth variant="outlined" label="Name" />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="demo-simple-select-outlined-label">Type</InputLabel>
            <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" label="status" fullWidth>
              <MenuItem value="hcm">Textarea</MenuItem>
              <MenuItem value="hn">Text Box</MenuItem>
              <MenuItem value="hna">Combo Box</MenuItem>
              <MenuItem value="hn">Datepicker</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
            <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" label="status" fullWidth>
              <MenuItem value="hcm">Active</MenuItem>
              <MenuItem value="hn">Not Active</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <br />
      <Grid container justify="flex-end">
        <Button type="submit" variant="contained" color="primary" startIcon={<AddIcon />}>
          Add
        </Button>
      </Grid>
    </>
  );
}

export default MasterAdd;
