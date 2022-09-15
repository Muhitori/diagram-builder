import { Box, Typography } from '@mui/material';
import {
  FC,
  useState,
  useEffect,
  useRef,
  useContext,
  useMemo,
  useCallback,
  CSSProperties,
} from 'react';
import { Handle, NodeProps, Position } from 'react-flow-renderer';
import { Moveable } from './Moveable';
import { NodeMenu } from './NodeMenu';
import { green, grey, red } from '@mui/material/colors';
import { ColorModeContext } from 'src/components/App';
import { useSelector } from 'react-redux';
import { nodeSizesSelector } from 'src/store/selector/Node.selector';
import { EditNodeModal } from 'src/components/common/modals/nodeModal/editNodeModal';

const handleStyles = {
  width: '7px',
  height: '7px',
};

const sourceHandleStyles: CSSProperties = {
  background: green[300],
  marginBottom: '-2px',
  ...handleStyles,
};

const targetHandleStyles: CSSProperties = {
  background: red[300],
  marginTop: '-2px',
  ...handleStyles,
};

export const DefaultNode: FC<NodeProps> = ({ id, isConnectable, data, selected }) => {
  const { width, height, children } = useSelector(nodeSizesSelector(id));
  const { mode } = useContext(ColorModeContext);

  const nodeRef = useRef<HTMLElement | null>(null);
  const [visibleNode, setVisibleNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!selected) {
      setVisibleNode(null);
    }
  }, [selected]);

  //fires on adding children to node (width & height are changed)
  useEffect(() => {
    if (nodeRef.current && width && height) {
      nodeRef.current.style.width = width + 'px';
      nodeRef.current.style.height = height + 'px';
      nodeRef.current.style.transform = 'rotate(0deg)';
    }
  }, [width, height]);

  const color = useMemo(
    () => (mode === 'light' ? grey[900] : grey[50]),
    [mode]
  );

  const showMoveable = useCallback(() => {
    if (nodeRef.current) {
      setVisibleNode(nodeRef.current);
    }
  }, [nodeRef.current]);

  const hideMoveable = useCallback(() => {
    setVisibleNode(null);
  }, [setVisibleNode]);

  return (
    <>
      {visibleNode && (
        <Moveable
          node={visibleNode}
          id={id}
          hideMoveable={hideMoveable}
          hasChildren={children.width > 0 && children.height > 0}
        />
      )}
      <Box
        ref={nodeRef}
        width={'100%'}
        height={'100%'}
        border={`1px solid ${color}`}
        borderRadius="3px"
        color={color}
        display="flex"
        alignItems="flex-start"
        justifyContent="center"
        onClick={showMoveable}
        p={1}
        sx={{
          backgroundColor: data.backgroundColor,
          ':hover': {
            boxShadow: `0px 0px 3px ${color}`,
          },
        }}
      >
        <Handle
          id={'1'}
          type="target"
          position={Position.Top}
          style={targetHandleStyles}
          isConnectable={isConnectable}
        />
        <Typography variant="body2">{data.label}</Typography>
        <Handle
          id={'2'}
          type="source"
          position={Position.Bottom}
          style={sourceHandleStyles}
          isConnectable={isConnectable}
        />
        <NodeMenu nodeId={id} />
      </Box>
      <EditNodeModal />
    </>
  );
};