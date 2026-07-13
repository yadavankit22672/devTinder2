const mongoose = require("mongoose")

const connectionRequestSchema = new mongoose.Schema({

    fromUserId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["ignored","interested", "accepted", "rejected"],
            message: "{VALUE} is incorrect status type"
        },
        default: "pending"
    }
}, {
    timestamps: true
})

connectionRequestSchema.pre("save",function(next){
    const connectionRequest = this;

    if(connectionRequest.fromUserId.toString() === connectionRequest.toUserId.toString()){
        throw new Error("You cannot send connection request to yourself");
    }
    next();
    
})

connectionRequestSchema.index({fromUserId:1,toUserId:1},{unique:true});

const ConnectionRequestModel = new mongoose.model("ConnectionRequest", connectionRequestSchema)

module.exports = ConnectionRequestModel

