import React from 'react';
import { useHistory } from 'react-router-dom';

// material core
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';

// atomic
import PaginationBase from 'components/molecules/PaginationBase';

// configs
import { PATH_NAME } from 'configs';

// helpers
import { canAction } from 'helpers';

// hooks
import usePagination from 'hooks/usePagination';

function createData(name: string, description: string, limit: string, status: string) {
  return { name, description, limit, status };
}

const rows = [
  createData('Merchant', 'Specific Merchant', '12 Merchant', 'Active'),
  createData('Diskon', 'Specific Merchant', '12 Merchant', 'Active'),
  createData('Promo', 'Specific Promo 10 %', '10 Merchant', 'Active'),
  createData('Merchant', 'Diskon Belanja 50 %', '500 Voucher', 'Active'),
  createData('Diskon 20 %', 'Diskon Belanja 20 %', '12 Merchant', 'Active'),
  createData('Diskon 10 %', 'Diskon Belanja 10 %', '12 Merchant', 'Active'),
];

function ConditionList() {
  const history = useHistory();
  const { page, perPage, _changePage, _changePerPage } = usePagination();

  return (
    <div>
      {canAction('create', 'product') ? (
        <Grid container justify="flex-end">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => history.push(PATH_NAME.CONDITION_ADD)}
          >
            Add CONDITION
          </Button>
        </Grid>
      ) : null}
      <br />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Condition</TableCell>
              <TableCell>Benefit</TableCell>
              <TableCell>Limit</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.limit}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PaginationBase pageIndex={page} perPage={perPage} totalPage={50} changePage={_changePage} changePerPage={_changePerPage} />
    </div>
  );
}

export default ConditionList;
