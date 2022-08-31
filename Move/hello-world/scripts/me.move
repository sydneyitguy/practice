script {
    use 0x1::HelloWorld;
    use 0x1::Debug;

    fun main() {
        let five = HelloWorld::gimme_five();

        Debug::print<u8>(&five);
    }
}