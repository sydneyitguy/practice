module publisher::hello {
    public entry fun one(): u8 {
        1
    }

    #[test]
    public fun test_one() {
        assert!(one() == 1, 0);
    }
}