import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import './HistoryTable.css';

const HistoryTable = () => {
  const [historyData, setHistoryData] = useState([]);
  const [polosData, setPolosData] = useState([]);

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

  const getPolosName = (id) => {
    const polo = polosData.find((polo) => polo.id === id);
    return polo ? polo.nome : '';
  };

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

  const data = React.useMemo(
    () =>
      historyData.map((item) => ({
        origem_id: item.origem_id,
        destino_id: item.destino_id,
        terminal_qtd: item.terminal_qtd,
      })),
    [historyData]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

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
