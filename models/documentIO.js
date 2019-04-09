import {FileSystem} from 'expo';

export default class DocumentIO {

    async writeDocument(document) {
        document = JSON.stringify(document);
        var result = await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + '/test.txt', document);
        return result;
    }

    async readDocument() {
        var result = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + '/test.txt');
        return result;
    }
}