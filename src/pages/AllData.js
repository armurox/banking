import Card from '../components/Card';
import {useContext} from 'react';
import UserDBContext from '../helpers/UserDBContext';
import UserContext from '../helpers/UserContext';
import '../styles/alldata.css';

function AllData() {

    const userObj = useContext(UserDBContext);
    const loginObj = useContext(UserContext);
    const users = userObj.users;
    let user =  loginObj.loggedIn !== '' ? users.filter(x=>x.number === loginObj.loggedIn)[0] :   
                users.length > 0 ? users[0] : null
    let transactions = user ? user.transactions : [];

    const chartHeader = <div className="data-grid-header-row"><div className="align-left"><b>Date</b></div><div className="data-grid-description align-left"><b>Description</b></div><div className="align-right"><b>Credit</b></div><div className="align-right"><b>Debit</b></div><div className="align-right"><b>Balance</b></div></div>;

    const header = "Recent Transactions";
    const content = <div className="data-grid">{chartHeader}{transactions.reverse().map((txn,i)=><ChartRow key={i} data={txn}></ChartRow>)}</div>;
    let form = '';


    return (
        <>
        {user ? <Card header={header} content={content} form={form}></Card> :
                <Card header={header} content="No transactions available to display" form={form}></Card>}
        </>
    )

}

function ChartRow({data}) {
    const txnDate = new Date(data.time);
    return (
        <div className="data-grid-row"><div className="align-left">{txnDate.toLocaleDateString()}</div><div className="data-grid-description align-left">{data.description}</div>{data.credit !== null ? <div className="align-right">${data.credit.toFixed(2)}</div> : <div></div>}{data.debit !== null ? <div className="align-right">-${data.debit.toFixed(2)}</div> : <div></div>}<div className="align-right">${data.newBalance.toFixed(2)}</div></div>
    )
}

export default AllData;