declare namespace gdjs {
    namespace pathfinding {
        /**
         * Simplify a path according to an allowed gap.
         *
         * The simplified path vertices are the same instances as the one in
         * the source. They must be cloned to make them truly independent from each
         * other.
         *
         * @param sourceVertices The path to simplify.
         * @param maxGap The maximum distance the edge of the contour may deviate
         * from the source geometry.
         * @param simplifiedVertices The simplified path.
         * @param workingVertices It avoids allocations.
         */
        const simplifyPath: (sourceVertices: FloatPoint[], maxGap: float, simplifiedVertices?: FloatPoint[], workingVertices?: FloatPoint[]) => FloatPoint[];
        /**
         * Returns the distance squared from the point to the line segment.
         *
         * Behavior is undefined if the the closest distance is outside the
         * line segment.
         *
         * @param px The X position of point (px, py).
         * @param py The Y position of point (px, py)
         * @param ax The X position of the line segment's vertex A.
         * @param ay The Y position of the line segment's vertex A.
         * @param bx The X position of the line segment's vertex B.
         * @param by The Y position of the line segment's vertex B.
         * @return The distance squared from the point (px, py) to line segment AB.
         */
        const getPointSegmentDistanceSq: (px: float, py: float, ax: float, ay: float, bx: float, by: float) => float;
    }
}
