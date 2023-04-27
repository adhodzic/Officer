import './AssetAgreementView.scss'
import { useEffect, useState, useContext, useMemo } from 'react'
import { Button, Form, FormGroup } from 'react-bootstrap'
import assetAgreementApi from '../../services/asset-agreement-api';
import assetApi from '../../services/asset-api';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../hooks/Auth/UserContext';
function AssetAgreementDetails() {
    const p = useParams()
    const { user } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingAssets, setIsLoadingAssets] = useState(true);
    const [generalInfo, setGeneralInfo] = useState();
    const [assets, setAssets] = useState();
    async function generateDoc() {
        console.log(p.id)
        await assetAgreementApi.pdf(p.id)
    }
    async function signDoc(){
        await assetAgreementApi.signPdf(p.id)
    }
    async function loadData() {
        setIsLoading(true)
        const data = await assetAgreementApi.get(p.id);
        setGeneralInfo(data[0])
        console.log(data[0])
        setIsLoading(false)
    }

    useEffect(() => {
        loadData();
    }, [])
    return (
        <div className='AssetAgreementDetails'>
            {!isLoading && (
                <>
                    <Form>
                        <div className='row'>
                            <div className='col'>
                            <div className="row">
                                <Form.Group>
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control value={user.FullName} type="text" disabled></Form.Control>
                                </Form.Group>
                            </div>
                            <div className="row">
                                <Form.Group>
                                    <Form.Label>OIB</Form.Label>
                                    <Form.Control value={user.OIB} type="text" disabled></Form.Control>
                                </Form.Group>
                            </div>
                            <div className="row">
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control value={user.Email} type="text" disabled></Form.Control>
                                </Form.Group>
                            </div>
                            <div className="row">
                                <Form.Group>
                                    <Form.Label>Position</Form.Label>
                                    <Form.Control value={user.Position} type="text" disabled></Form.Control>
                                </Form.Group>
                            </div>
                            <div className='row'>
                                <FormGroup>
                                    <Form.Label>User agreement</Form.Label>
                                    <Form.Control value={generalInfo.Name} type="text" disabled></Form.Control>
                                </FormGroup>
                            </div>
                            <div className='row'>
                                <FormGroup>
                                    <Form.Label>Reason</Form.Label>
                                    <Form.Control value={generalInfo.Reason} type="text" disabled></Form.Control>
                                </FormGroup>
                            </div>
                            <div className='row'>
                                <FormGroup>
                                    <Form.Label>Status</Form.Label>
                                    <Form.Control value={generalInfo.Status} type="text" disabled></Form.Control>
                                </FormGroup>
                            </div>
                            </div>
                        <div className='col'>
                            <ul>
                                {generalInfo.Assets.split(',').map((a) => {
                                    return <li>{a}</li>
                                })}
                            </ul>
                        </div>
                        </div>
                    </Form>
                    {<Button type='button' onClick={() => generateDoc()}>Download document</Button>}
                    {<Button type='button' onClick={() => signDoc()}>E-sign document</Button>}
                </>
            )

            }
        </div>
    )
}

export default AssetAgreementDetails