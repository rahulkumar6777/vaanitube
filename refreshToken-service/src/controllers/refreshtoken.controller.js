const refreshToken = async (req, res) => {
    try {

    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

export { refreshToken };