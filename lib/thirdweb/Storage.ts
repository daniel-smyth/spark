import { IStorage, MetadataURIOrObject, UploadMetadataBatchResult } from "@3rdweb/sdk";
import { BufferOrStringWithName } from "@3rdweb/sdk/dist/types/BufferOrStringWithName";
import FileOrBuffer from "@3rdweb/sdk/dist/types/FileOrBuffer";

export class Storage implements IStorage {
    upload(data: string | FileOrBuffer, contractAddress?: string, signerAddress?: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    uploadBatch(files: Buffer[] | string[] | FileOrBuffer[] | File[] | BufferOrStringWithName[], contractAddress?: string, uploadFileStartNumber?: number): Promise<string> {
        throw new Error("Method not implemented.");
    }
    getUploadToken(contractAddress: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    get(hash: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    resolveFullUrl(hash: string): string {
        throw new Error("Method not implemented.");
    }
    uploadMetadata(metadata: MetadataURIOrObject, contractAddress?: string, signerAddress?: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    uploadMetadataBatch(metadatas: MetadataURIOrObject[], contractAddress?: string, fileStartNumber?: number): Promise<UploadMetadataBatchResult> {
        throw new Error("Method not implemented.");
    }
    canResolve(uri: string): boolean {
        throw new Error("Method not implemented.");
    }
}