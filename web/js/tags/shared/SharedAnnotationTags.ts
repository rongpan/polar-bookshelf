import {TagDescriptor} from "../TagNode";
import {SharedTags} from "./SharedTags";

export class SharedAnnotationTags {

    public static write(tags: ReadonlyArray<TagDescriptor>) {
        SharedTags.write('shared-tags:annotations', tags);
    }

    public static read(): ReadonlyArray<TagDescriptor> {
        return SharedTags.read('shared-tags:annotations');
    }

}

