import mongoose from 'mongoose';

const invoiceSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    invoiceNumber: {
        type: String,
        required: true,
    },
    client: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: String },
        phone: { type: String },
    },
    items: [{
        description: { type: String, required: true },
        quantity: { type: Number, required: true },
        rate: { type: Number, required: true },
        amount: { type: Number, required: true },
    }],
    subtotal: {
        type: Number,
        required: true,
    },
    tax: {
        type: Number,
        default: 0,
    },
    total: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['draft', 'sent', 'paid', 'overdue'],
        default: 'draft',
    },
    dueDate: {
        type: Date,
    },
    issueDate: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

export default Invoice;