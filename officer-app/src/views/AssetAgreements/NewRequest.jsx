import { useEffect, useState } from "react"
import { Form, Modal, Button, Alert, Toast, ToastContainer } from "react-bootstrap"
import assetAgreementApi from '../../services/asset-agreement-api'
import AssetTable from "../Assets/components/AssetTable"
import { useContext } from "react";
import { UserContext } from "../../hooks/Auth/UserContext";
import './AssetAgreementView.scss'
import { useNavigate } from 'react-router-dom'
import loader from '../../assets/loader.svg'
function NewRequest() {
    const navigate = useNavigate()
    const { user } = useContext(UserContext);
    const [selectedAssets, setSelectedAssets] = useState([])
    const [show, setShow] = useState(false)
    const [reason, setReason] = useState()
    const [assetValidation, setAssetValidation] = useState(false)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (!assetValidation) {
            return
        }
        setTimeout(() => {
            setAssetValidation(false)
        }, 3000)
    }, [assetValidation])
    function handleClose(submit) {
        setShow(false)
    }
    async function createRequest(e) {
        e.preventDefault()
        setLoading(true)
        if (selectedAssets.length <= 0) {
            setAssetValidation(true);
            return
        }
        const assets = selectedAssets.map(a => {
            return {_id: a.original._id,Name: a.original.Name}
        })
        const newAgrement = {
            Reason: reason,
            Assets: assets
        }
        const data = await assetAgreementApi.create(newAgrement)
        setLoading(false)
        console.log(data.scope,data.scope?.["lastID"])
        if(data?.scope?.lastID <= 0) return
        // window.open(data.envelopeUrl, '_blank').focus();
        navigate(`/asset-agreements/details/${data.scope.lastID}`)
    }
    return (
        <div className='NewRequest'>
            {loading && <div className="spinner">
              <img src={loader} alt="loading..."></img>
            </div>}
            <h1>New asset request</h1>
            <Form onSubmit={createRequest}>
                <div className="row">
                    <div className="col">
                        <Form.Group>
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control onChange={(e) => true} value={user?.FullName} type="text" disabled></Form.Control>
                        </Form.Group>
                    </div>
                    <div className="col">
                        <Form.Group>
                            <Form.Label>OIB</Form.Label>
                            <Form.Control onChange={(e) => true} value={user?.OIB} type="text" disabled></Form.Control>
                        </Form.Group>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control onChange={(e) => true} value={user?.Email} type="text" disabled></Form.Control>
                        </Form.Group>
                    </div>
                    <div className="col">
                        <Form.Group>
                            <Form.Label>Position</Form.Label>
                            <Form.Control onChange={(e) => true} value={user?.Position} type="text" disabled></Form.Control>
                        </Form.Group>
                    </div>
                </div>
                <div className="row">
                    <Form.Group>
                        <Form.Label>Reason</Form.Label>
                        <Form.Control onChange={(e) =>
                            setReason(e.target.value)
                        } type="text" required></Form.Control>
                    </Form.Group>
                </div>
                <div className="row">
                    <Form.Group>
                        <Form.Label>Select assets</Form.Label>
                        <div className="selected-asset-list">
                            {selectedAssets.map(a => {
                                return (
                                    <div key={a.original._id} className="selected-asset">
                                        <p>{a.original.Name}</p>
                                    </div>
                                )
                            })}
                        </div>
                        <Button onClick={() => setShow(true)} >Add assets</Button>
                    </Form.Group>
                </div>
                <div className="row">
                    <Form.Group>
                        <Button type="submit" >Create request</Button>
                    </Form.Group>
                </div>
            </Form>
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>
                        Include equipment
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AssetTable unassigned={true} setSelectedAssets={setSelectedAssets} selectedAssets={selectedAssets} actionBar={false}></AssetTable>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                    <Button
                        form="group-form"
                        variant="primary"
                        onClick={(e) => { e.preventDefault(); handleClose(true) }}
                    >
                        Add selected
                    </Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer bg="warning" className="p-3" position={'top-end'}>
                <Toast bg="warning" onClose={() => setAssetValidation(false)} show={assetValidation} className="d-inline-block m-1">
                    <Toast.Header closeButton={false}>
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        />
                        <strong className="me-auto">Warning</strong>
                        {/* <small>{new Date(Date.now()).toDateString()}</small> */}
                    </Toast.Header>
                    <Toast.Body>Please select at least one asset</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    )
}

export default NewRequest