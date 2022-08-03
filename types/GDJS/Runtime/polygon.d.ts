declare namespace gdjs {
    type CollisionTestResult = {
        collision: boolean;
        move_axis: FloatPoint;
    };
    type RaycastTestResult = {
        collision: boolean;
        closeX: float;
        closeY: float;
        closeSqDist: float;
        farX: float;
        farY: float;
        farSqDist: float;
    };
    /**
     * Polygon represents a polygon which can be used to create collisions masks for RuntimeObject.
     */
    class Polygon {
        /**
         * The vertices of the polygon
         */
        vertices: Array<FloatPoint>;
        /**
         * The edges of the polygon. This property is only valid after calling
         * computeEdges, and remains valid until vertices are modified.
         */
        edges: Array<FloatPoint>;
        /**
         * The center of the polygon. This property is only valid after calling
         * computeCenter, and remains valid until vertices are modified.
         */
        center: FloatPoint;
        move(x: float, y: float): void;
        rotate(angle: float): void;
        computeEdges(): void;
        isConvex(): boolean;
        computeCenter(): FloatPoint;
        static createRectangle(width: float, height: float): gdjs.Polygon;
        /**
         * Do a collision test between two polygons.
         * Please note that polygons must *convexes*!
         *
         * Uses <a href="http://en.wikipedia.org/wiki/Hyperplane_separation_theorem">Separating Axis Theorem </a>.<br>
         * Based on <a href="http://www.codeproject.com/Articles/15573/2D-Polygon-Collision-Detection">this</a>
         * and <a href="http://stackoverflow.com/questions/5742329/problem-with-collision-response-sat">this</a> article.
         *
         * @return returnValue.collision is equal to true if polygons are overlapping
         * @param p1 The first polygon
         * @param p2 The second polygon
         * @param ignoreTouchingEdges If true, then edges that are touching each other, without the polygons actually overlapping, won't be considered in collision.
         */
        static collisionTest(p1: gdjs.Polygon, p2: gdjs.Polygon, ignoreTouchingEdges: boolean): CollisionTestResult;
        /**
         * Do a raycast test.<br>
         * Please note that the polygon must be <b>convex</b>!
         *
         * For some theory, check <a href="https://www.codeproject.com/Tips/862988/Find-the-Intersection-Point-of-Two-Line-Segments">Find the Intersection Point of Two Line Segments</a>.
         *
         * @param poly The polygon to test
         * @param startX The raycast start point X
         * @param startY The raycast start point Y
         * @param endX The raycast end point X
         * @param endY The raycast end point Y
         * @return A raycast result with the contact points and distances
         */
        static raycastTest(poly: gdjs.Polygon, startX: float, startY: float, endX: float, endY: float): RaycastTestResult;
        static normalise(v: FloatPoint): void;
        static dotProduct(a: FloatPoint, b: FloatPoint): float;
        static crossProduct(a: FloatPoint, b: FloatPoint): float;
        static project(axis: FloatPoint, p: gdjs.Polygon, result: FloatPoint): void;
        static distance(minA: float, maxA: float, minB: float, maxB: float): float;
        /**
         * Check if a point is inside a polygon.
         *
         * Uses <a href="https://wrf.ecse.rpi.edu//Research/Short_Notes/pnpoly.html">PNPOLY</a> by W. Randolph Franklin.
         *
         * @param poly The polygon to test
         * @param x The point x coordinate
         * @param y The point y coordinate
         * @return true if the point is inside the polygon
         */
        static isPointInside(poly: gdjs.Polygon, x: float, y: float): boolean;
        private static collisionTestStatics;
        private static raycastTestStatics;
    }
}
