import { Link } from "react-router-dom";
import { Card, Chip, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { getCategories, getProducts } from "src/service/api/get";


export default function User() {

    const { data, error, isLoading } = useQuery(['categories'], getCategories)
    const { data: data2, error: error2, isLoading: isLoading2 } = useQuery(['products'], getProducts)


    return (
        <div>
            <Card sx={{ p: 2, m: 'auto', mt: 3, maxWidth: '400px' }}>
                <Typography variant='h6'>Categories ({data?.count})</Typography>
                {
                    data?.categories?.map((cat: any) => (
                        <Link
                            style={{
                                color: 'white',
                                textDecoration: 'none',
                            }}
                            to={`/category/${cat._id}`} key={cat._id}>
                            <Chip sx={{ m: 1, cursor: 'pointer' }} label={cat.name} color='info' />
                        </Link>
                    ))
                }
            </Card>

            <Card sx={{ mx: 'auto', mt: 2, p: 2, maxWidth: '400px' }}>
                <Typography variant='h6'>Products ({data2?.count})</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ProductName</TableCell>
                            <TableCell>Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data2?.products?.map((prod: any) => (
                                <TableRow key={prod._id}>
                                    <TableCell>{prod.name}</TableCell>
                                    <TableCell>{prod.price}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>

            </Card>
        </div>
    )
}
