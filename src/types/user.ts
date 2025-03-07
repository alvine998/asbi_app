export interface IUser {
    id:           number;
    code:         string;
    name:         string;
    phone:        string;
    email:        string;
    pob:          string;
    dob:          string;
    agreement:    number;
    verified:     number;
    is_reset:     null;
    verify_token: null;
    role:         string;
    otp:          string;
    otp_expired:  Date;
    balance:      number;
    wallet:       number;
    donation:     number;
    status:       number;
    created_on:   Date;
    updated_on:   Date;
}