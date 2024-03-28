import { Box } from "@chakra-ui/react"
import { useCallback, useState } from "react"
import { Transforms, createEditor } from "slate"
import { Editable, ReactEditor, Slate, useSlateStatic, withReact } from "slate-react"

const initialValue = [
    {
        type: 'paragraph',
        children: [{ text: '初期テキスト' }]
    }
]
export const SlateTest = () => {
    const [editor] = useState(() => withReact(createEditor()))

    const renderElement = useCallback(props => {
        return (
            <p {...props.attributes}>{props.children}</p>
        )
    })

    return (
        <Box mt={8}>
            <InsertImgButton />
            <Slate editor={editor} initialValue={initialValue}>
                <Editable renderElement={renderElement} />
            </Slate>
        </Box>
    )
}

export const InsertImgButton = () => {
    const editor = useSlateStatic()
    const insertImageElement = useCallback(
        () => {
            const element = {
                type: 'image',
                src: 'https://dummyimage.com/600x400/000/fff',
                children: [{ text: '' }],
            }

            Transforms.insertNodes(editor, element);

            if (editor.selection) {
                Transforms.select(editor, editor.selection);
                ReactEditor.focus(editor);
            }
        },
        [editor],
    );
    return <button onClick={insertImageElement}>画像挿入</button>
}