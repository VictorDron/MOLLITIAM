import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import './HistoryTable.css';

const HistoryTable = () => {
  // State variables
  const [historyData, setHistoryData] = useState([]);
  const [polosData, setPolosData] = useState([]);

  // Fetch history data and polos data on component mount
  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/polos/history');
        setHistoryData(response.data);
      } catch (error) {
        console.error('Error fetching history data:', error);
      }
    };

    const fetchPolosData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/polos');
        setPolosData(response.data);
      } catch (error) {
        console.error('Error fetching polos data:', error);
      }
    };

    fetchHistoryData();
    fetchPolosData();
  }, []);

  // Fetch updated history data when historyData changes
  useEffect(() => {
    const fetchUpdatedHistoryData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/polos/history');
        setHistoryData(response.data);
      } catch (error) {
        console.error('Error fetching updated history data:', error);
      }
    };

    fetchUpdatedHistoryData();
  }, [historyData]);

  // Get the name of the polo based on its id
  const getPolosName = (id) => {
    const polo = polosData.find((polo) => polo.id === id);
    return polo ? polo.nome : '';
  };

  // Define the columns for the table
  const columns = React.useMemo(
    () => [
      {
        Header: 'Origem',
        accessor: 'origem_id',
        Cell: ({ value }) => getPolosName(value),
      },
      {
        Header: 'Destino',
        accessor: 'destino_id',
        Cell: ({ value }) => getPolosName(value),
      },
      {
        Header: 'Quantidade',
        accessor: 'terminal_qtd',
      },
    ],
    [polosData]
  );

  // Prepare the data for the table
  const data = React.useMemo(
    () =>
      historyData.map((item) => ({
        origem_id: item.origem_id,
        destino_id: item.destino_id,
        terminal_qtd: item.terminal_qtd,
      })),
    [historyData]
  );

  // Use the react-table library to create the table instance
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  // Render the table
  return (
    <div className="history-table-container">
      <table {...getTableProps()} className="history-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
