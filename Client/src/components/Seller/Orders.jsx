import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { Dropdown, DropdownDivider, Modal } from 'flowbite-react';

const Orders = () => {
    const { user } = useContext(StoreContext);
    const [orders, setOrders] = useState([]);
    const [address, setAddress] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch(`/api/order/getorder/${user._id}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                if (res.ok) {
                    const data = await res.json();
                    setOrders(data.orders);
                } else {
                    console.error('Failed to fetch orders');
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [user._id]);

    const handleClick = async (order) => {
        try {
            const res = await fetch(`/api/delivery/getaddress/${order.delivery}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            if (res.ok) {
                const data = await res.json();
                setAddress(data.delivery);
                setSelectedOrder(order);
                setShowModal(true);
            } else {
                console.error('Failed to fetch address');
            }
        } catch (error) {
            console.error('Error fetching address:', error);
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const res = await fetch(`/api/order/updatestatus/${user._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId, status: newStatus }),
            });
            if (res.ok) {
                const updatedOrders = orders.map((order) => {
                    if (order._id === orderId) {
                        return { ...order, status: newStatus };
                    }
                    return order;
                });
                setOrders(updatedOrders);
            } else {
                console.error('Failed to update order status');
            }
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
            case 'rejected':
                return '#DC2626'; // Red color for pending and rejected
            case 'accepted':
            case 'delivered':
                return '#34D399'; // Green color for accepted and delivered
            case 'dispatched':
                return '#3B82F6'; // Blue color for dispatched
            default:
                return '#000000'; // Default color
        }
    };

    const calculateTotalAmount = () => {
        if (!selectedOrder) return 0;
        return selectedOrder.quantity * selectedOrder.price;
    };

    return (
        <div className='min-h-screen mt-5 md:mt-0'>
            <div>
                <div className='flex flex-row justify-evenly text-center mx-1 md:mx-20'>
                    <p className="w-full md:w-1/6 tracking-widest md:text-lg text-xs font-medium text-gray-600 mt-2">Item</p>
                    <p className="w-full md:w-1/6 tracking-widest md:text-lg text-xs font-medium text-gray-600  mt-2">Name</p>
                    <p className="w-full md:w-1/6 tracking-widest md:text-lg text-xs font-medium text-gray-600 mt-2">Price</p>
                    <p className="w-full md:w-1/6 tracking-widest md:text-lg text-xs font-medium text-gray-600  mt-2">Quantity</p>
                    <p className="w-full md:w-1/6 tracking-widest md:text-lg text-xs font-medium text-gray-600  mt-2">Total</p>
                    <p className="w-full md:w-1/6 tracking-widest md:text-lg text-xs font-medium text-gray-600  mt-2">Status</p>
                </div>
                <hr className="w-full border-2 my-3" />
                {orders.map((order) => {
                    return (
                        <React.Fragment key={order._id}>
                            <div className="flex flex-row justify-evenly items-center mx-1 md:mx-20 text-center cursor-pointer" key={order._id}>
                                <div className='w-full md:w-1/6' style={{ textAlign: '-webkit-center' }}>
                                    <img src={'/api/images/' + order.image} alt={order.name} className="rounded-full md:w-20 md:h-20 w-12 h-12 object-cover" />
                                </div>
                                <p className="w-full md:w-1/6 tracking-widest md:text-lg text-xs title-font font-medium text-gray-800 mb-1" onClick={() => handleClick(order)}>{order.name}</p>
                                <p className="w-full md:w-1/6 tracking-widest md:text-lg text-xs title-font font-medium text-gray-800 mb-1">₹{order.price}</p>
                                <p className="w-full md:w-1/6 tracking-widest md:text-lg text-xs title-font font-medium text-gray-800 mb-1">{order.quantity}</p>
                                <p className="w-full md:w-1/6 tracking-widest md:text-lg text-xs title-font font-medium text-gray-800 mb-1">₹{order.total}</p>
                                <p className="w-full md:w-1/6 tracking-widest md:text-lg text-xs title-font font-medium mb-1" style={{ textAlign: '-webkit-center', color: getStatusColor(order.status) }}>
                                    <Dropdown arrowIcon={false} inline label={order.status} as='div'>
                                        {['accepted', 'rejected', 'dispatched', 'delivered'].map((status) => (
                                            <React.Fragment key={status}>
                                                <Dropdown.Item
                                                    key={status} // Assign a unique key for each Dropdown.Item
                                                    onClick={() => handleStatusChange(order._id, status)}
                                                >
                                                    {status}
                                                </Dropdown.Item>
                                                <DropdownDivider key={`divider-${status}`} />
                                            </React.Fragment>
                                        ))}
                                    </Dropdown>
                                </p>
                            </div>
                            <hr className="w-full my-3 border-2" />
                        </React.Fragment>
                    );
                })}
                <Modal show={showModal} onClose={() => setShowModal(false)} size="md">
                    <Modal.Header>
                        <h3 className='text-lg font-bold text-gray-700'>Order Details</h3>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="flex flex-col items-center space-y-4 overflow-y-auto">
                            <div className='w-full border p-4 rounded-lg shadow-md'>
                                <h4 className='text-md font-bold text-gray-700 mb-2'>Delivery Address</h4>
                                <div className='grid grid-cols-1 gap-2 text-left'>
                                    {Object.entries(address)
                                        .filter(([key]) => !['_id', 'orders', '__v'].includes(key))
                                        .map(([key, value]) => (
                                            <div key={key} className="flex justify-between">
                                                <span className='font-semibold'>{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                                                <span>{value}</span>
                                            </div>
                                        ))}
                                </div>
                            </div>
                            {selectedOrder && (
                                <div className='w-full border p-4 rounded-lg shadow-md'>
                                    <h4 className='text-md font-bold text-gray-700 mb-2'>Order Summary</h4>
                                    <div className='flex flex-col space-y-2'>
                                        <div className='flex justify-between'>
                                            <span className='font-semibold'>Item:</span>
                                            <span>{selectedOrder.name}</span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span className='font-semibold'>Price:</span>
                                            <span>₹{selectedOrder.price}</span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span className='font-semibold'>Quantity:</span>
                                            <span>{selectedOrder.quantity}</span>
                                        </div>
                                        <hr className='my-2' />
                                        <div className='flex justify-between font-semibold text-lg'>
                                            <span>Total Amount:</span>
                                            <span>₹{calculateTotalAmount()}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
};

export default Orders;
