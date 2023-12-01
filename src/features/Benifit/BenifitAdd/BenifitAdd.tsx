import React from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

function ConditionAdd() {
  return (
    <>
      <Grid container alignItems="center">
        <Grid item sm={12}>
          <h2>Add Bisnis Unit</h2>
        </Grid>
      </Grid>
      <Grid>
        <h3>Information</h3>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField fullWidth variant="outlined" label="Name" />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
            <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" label="City" fullWidth>
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

export default ConditionAdd;
